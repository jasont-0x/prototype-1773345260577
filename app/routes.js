const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/age-check', function (req, res) {
  res.render('age-check')
})

router.post('/age-check', function (req, res) {
  const answer = req.session.data['age-check']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'age-check': 'Select yes if you are 18 or over' }
    return res.render('age-check')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-age-check')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-age-check', function (req, res) {
  res.render('ineligible-age-check')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name' }
    return res.render('full-name')
  }
  res.redirect('/contact-method')
})

router.get('/contact-method', function (req, res) {
  res.render('contact-method')
})

router.post('/contact-method', function (req, res) {
  const answer = req.session.data['contact-method']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-method': 'Select how you would like us to contact you' }
    return res.render('contact-method')
  }
  res.redirect('/contact-details')
})

router.get('/contact-details', function (req, res) {
  res.render('contact-details')
})

router.post('/contact-details', function (req, res) {
  const answer = req.session.data['contact-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-details': 'Enter your contact details' }
    return res.render('contact-details')
  }
  res.redirect('/meeting-reason')
})

router.get('/meeting-reason', function (req, res) {
  res.render('meeting-reason')
})

router.post('/meeting-reason', function (req, res) {
  const answer = req.session.data['meeting-reason']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'meeting-reason': 'Tell us why you want to meet aliens' }
    return res.render('meeting-reason')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('ALN')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
