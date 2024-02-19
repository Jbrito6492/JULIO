# frozen_string_literal: true

OpenAI.configure do |config|
  config.access_token = ENV['OPENAI_ACCESS_TOKEN']
  config.api_version = 'gpt-3.5-turbo'
end
