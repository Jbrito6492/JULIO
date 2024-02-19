# frozen_string_literal: true

module Services
  class OpenAi
    def self.generate_speech(input_text)
      client = OpenAI::Client.new
      response = client.audio.speech(
        parameters: {
          model: 'tts-1',
          input: input_text,
          voice: 'fable'
        }
      )

      file_path = Rails.root.join('public', 'julio.mp3')
      File.binwrite(file_path, response)

      '/julio.mp3'
    end
  end
end
