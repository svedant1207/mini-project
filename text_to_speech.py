from gtts import gTTS
def convert_text_to_speech(text,lang='en',output_file='output.mp3'):
    try:
        tts = gTTS(text=text, lang=lang)
        tts.save(output_file)
        return output_file
    except Exception as e:
        raise Exception(f"TTS error: {e}")