# J.U.L.I.O.: Justiciero Universal de Logística, Inteligencia, y Operaciones

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* Run Locally
    - Clone the repository
    - Install Ruby 3.2.2
    - Run `bundle install`
    - Run `rails db:create`
    - Run `rails db:migrate`
    - Create a `.env` file with the following content:
        ```
        OPENAI_ACCESS_TOKEN=your_openai_access_token
        ```
    - Create an SSL certificate for voice recognition:
        ```
        openssl req -x509 -sha256 -nodes -newkey rsa:2048 -keyout localhost.key -out localhost.crt -subj "/CN=localhost" -days 365
        ```
    - Create an SSL directory under `config` and move the certificate and key files there:
        ```
        mkdir config/ssl
        mv localhost.key config/ssl
        mv localhost.crt config/ssl
        ```
    - Run `bin/dev`
