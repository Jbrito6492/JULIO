OpenRouter.configure do |config|
  config.access_token = Rails.application.credentials.open_router[:access_token]
  config.site_name = 'Olympia'
  config.site_url = 'https://olympia.chat'
end
