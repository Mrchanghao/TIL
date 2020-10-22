from __future__ import print_function
import pickle
import os.path
from googlepiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow 
from google.auth.transport.requests import Request 

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

SAMPLE_SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
SAMPLE_RANGE_NAME = 'Class Data!A2:E'

