# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    welcome_message = 'Welcome to JULIO, viejón. Ask me anything.'
    OpenAI::Client.assistants.retrieve(session[:assistant_id])
    @audio_path = Services::OpenAi.generate_speech(welcome_message)
  end
end
