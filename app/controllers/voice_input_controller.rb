# frozen_string_literal: true

class VoiceInputController < ApplicationController
  def create
    redirect_to dashboard_url, notice: 'Voice input was successfully processed.'
  end
end
