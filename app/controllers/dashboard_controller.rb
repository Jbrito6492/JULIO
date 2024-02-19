# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    response = OpenAI::Client.new.audio.speech(
      parameters: {
        model: 'tts-1',
        input: "Welcome to JULIO, viejón! The time is #{Time.zone.now.strftime('%H:%M on %B %d, %Y')}.",
        voice: 'fable'
      }
    )
    File.binwrite(Rails.root.join('public', 'welcome.mp3'), response)
    @audio_path = '/welcome.mp3'
  end
end
