# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    welcome_message = "Welcome to JULIO, viejón. The time is #{Time.zone.now.strftime('%H:%M on %B %d, %Y')}."
    @audio_path = Services::OpenAi.generate_speech(welcome_message)
  end
end
