/// <reference types="cypress" />





describe('Update Booking', () => {

    var token = ''
    var bookingId = ''
    before('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                username: 'admin',
                password: 'password123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            token = response.body.token
        })
    })

    beforeEach('Create Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        }).then((response) =>{
            expect(response.status).to.eql(200)
            expect(response.body).not.to.be.a('number')
            expect(response.body.booking.totalprice).to.eql(111)
            bookingId = response.body.bookingid
        })
    })

    it('Update Booking', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            failOnStatusCode: false,
            body: {
                "firstname": "Darko",
                "lastname": "Browny",
                "totalprice": 11108,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.totalprice).to.eql(11108)
            
        }
        )
    })                     

    it('Update Booking with invalid token  token', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
            failOnStatusCode: false,
            body: {
                "firstname": "Darko",
                "lastname": "Browny",
                "totalprice": 11108,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Cookie': `token=${token}`
            }
        })
        
    })
    it('Update Booking without token', () => {
            cy.request({
                method: 'PUT',
                url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
                failOnStatusCode: false,
                body: {
                    "firstname": "Darko",
                    "lastname": "Browny",
                    "totalprice": 11108,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2018-01-01",
                        "checkout": "2019-01-01"
                    },
                    "additionalneeds": "Breakfast"
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': 'token=12234ddar'
                }
            })
        })
})