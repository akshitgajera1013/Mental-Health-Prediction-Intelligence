import joblib
import pandas as pd
from pydantic import BaseModel,Field
from typing import Literal
from fastapi import FastAPI

app=FastAPI()

model=joblib.load('xgboost_mental_health_prediction_pipeline.pkl')

class StudentFeature(BaseModel):
    age : int=Field(...)
    gender : Literal['male','female']
    daily_social_media_hours : float=Field(...)
    platform_usage : Literal['Instagram', 'TikTok', 'Both']
    sleep_hours : float=Field(...)
    screen_time_before_sleep : float=Field(...)
    academic_performance : float=Field(...)
    physical_activity : float=Field(...)
    social_interaction_level : Literal['low', 'high', 'medium']
    stress_level : int=Field(...)
    anxiety_level :  int=Field(...)
    addiction_level :  int=Field(...)


class Depression(BaseModel):
     depression : int 


@app.post('predict',response_model=Depression)
def predict(data:StudentFeature):
    input_raw=pd.DataFrame([{
            'age' : data.age,
            'gender':data.gender,
            'daily_social_media_hours':data.daily_social_media_hours,
            'platform_usage':data.platform_usage,
            'sleep_hours':data.sleep_hours,
            'screen_time_before_sleep':data.screen_time_before_sleep,
            'academic_performance':data.academic_performance,
            'physical_activity':data.physical_activity,
            'social_interaction_level':data.social_interaction_level,
            'stress_level':data.stress_level,
            'anxiety_level':data.anxiety_level,
            'addiction_level':data.addiction_level,
    }])

    prediction=model.predict(input_raw)[0]
    return Depression(depression=prediction)

