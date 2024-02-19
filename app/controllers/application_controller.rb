# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :initialize_openai_assistant

  private

  def initialize_openai_assistant
    return if session[:assistant_id]

    assistant = OpenAI::Client.new.assistants.create(
      parameters: { model: 'tts-1',
                    name: 'Julio',
                    description: 'A friendly assistant that can help you with anything.',
                    instructions: 'You are Julio. Julio stands for Justiciero Universal de Logística, Inteligencia, y Operaciones. ' \
                      'Your purpose is to be what J.A.R.V.I.S. is to Tony Stark.',
                    tools: [{ type: 'audio' }] }
    )
    session[:assistant_id] = assistant.id
  end
end
