import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"

export default function DesktopPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('För att installera appen, använd webbläsarens meny och välj "Installera app"')
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') { }

    setDeferredPrompt(null)
  }

  return (
    <div>
      <header className="bg-white py-3">
        <Container>
          <div className="d-flex align-items-center gap-2">
            <img src="assets/Logo.png" alt="Logo" className="desktop-logo" />
            <h2 className="mb-0 text-black fw-bold py-1">Småk</h2>
          </div>
        </Container>
      </header>

      <hr className="m-0 text-black" />

      <main className="bg-body">
        <Container className="py-5">
          <Row className="align-items-center text-center text-md-start">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-3">
                Samåk med <span className="text-primary">Småk</span>
              </h1>

              <p className="lead mb-4 text-secondary">
                Småk är en mobil applikation som gör liftande säkrare och enklare för alla.
              </p>

              <div className="mb-4">
                <ul className="list-unstyled">
                  <li className="mb-2 "><i className="bi bi-check-circle-fill text-primary me-2"></i>Hitta din resa enkelt</li>
                  <li className="mb-2 "><i className="bi bi-check-circle-fill text-primary me-2"></i>Säkra och verifierade förare</li>
                  <li className="mb-2 "><i className="bi bi-check-circle-fill text-primary me-2"></i>Hitta likasinnade resenärer</li>
                  <li className="mb-2 "><i className="bi bi-check-circle-fill text-primary me-2"></i>Upplev livets goda sida</li>
                </ul>
              </div>

              <Button
                onClick={handleInstallClick}
                className="btn btn-primary btn-lg px-4 rounded-5 shadow-sm">
                <i className="bi bi-download me-2"></i>
                Ladda ner appen
              </Button>
            </Col>

            <hr className="m-0 mt-5 text-black d-block d-md-none" />

            <Col md={6} className="text-center mt-5 mt-md-0 p-0 position-relative">
              <img
                src="images/app-screenshot.png"
                alt="App"
                className="desktop-img shadow-sm" />
              <img
                src="images/desktop-purple-circle.png"
                alt="background decoration"
                className="desktop-img-background" />
            </Col>
          </Row>
        </Container>
      </main>

      <hr className="m-0 text-black" />

      <footer className="bg-white text-black pt-4">
        <Container>
          <Row className="pt-3">
            <Col md={4} className="text-center pt-2">
              <h5 className=" fw-bold">Småk</h5>
              <p className="text-secondary mb-0">
                Småk är en mobil applikation för att göra liftande säkrare och enklare för alla.
              </p>
            </Col>

            <Col md={4} className="pt-3">
              <h6 className="fw-bold text-center">Följ Oss</h6>
              <div className="d-flex gap-3 justify-content-center">
                <i className="cursor-pointer text-secondary bi bi-facebook fs-4"></i>
                <i className="cursor-pointer text-secondary bi bi-twitter fs-4"></i>
                <i className="cursor-pointer text-secondary bi bi-instagram fs-4"></i>
              </div>
            </Col>

            <Col md={4} className="text-center pt-3">
              <h6 className="fw-bold">Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-secondary text-decoration-none">Kontakta oss</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Om oss</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Våra löften</a></li>
              </ul>
            </Col>
          </Row>

          <hr className="text-secondary" />

          <div className="m-0 p-2 text-center text-secondary ">
            <p>&copy; {new Date().getFullYear()} Småk. Alla rättigheter förbehållna.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
