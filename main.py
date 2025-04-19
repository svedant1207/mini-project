from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from speech_to_text import convert_speech_to_text
from translate import translate_text
from text_to_speech import convert_text_to_speech
from text_to_speech import text_to_speech_main
from speech_to_text_utils import convert_speech_to_text
from fastapi import UploadFile, Form
import os

app = FastAPI()

@app.post("/speech-to-text/")
async def speech_to_text(audio_file: UploadFile = File(...)):
    temp_file = "temp_audio.wav"
    with open(temp_file, "wb") as buffer:
        buffer.write(await audio_file.read())

    try:
        text = convert_speech_to_text(temp_file)
        return {"text": text} if text else JSONResponse(content={"error": "Could not understand the audio"}, status_code=400)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/translate/")
async def translate(text: str, target_lang: str):
    try:
        translated_text = translate_text(text, target_lang)
        return {"translated_text": translated_text}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/text-to-speech/")
async def text_to_speech(text: str, language: str = 'en'):
    try:
        output_file = "output.mp3"
        convert_text_to_speech(text, language, output_file)
        return FileResponse(output_file, media_type="audio/mpeg", filename=output_file)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/api/text-to-speech")
async def tts_api(text: str = Form(...)):
    filename = "output.mp3"
    text_to_speech_main(text, filename)
    return FileResponse(filename, media_type="audio/mpeg")

@app.post("/api/speech-to-text")
async def stt_api(file: UploadFile):
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())
    result = convert_speech_to_text(file_path)
    os.remove(file_path)
    return JSONResponse(content={"transcript": result})