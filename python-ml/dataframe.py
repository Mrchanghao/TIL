import pandas as pd



dataframe = pd.DataFrame()

dataframe['Name'] = ['Jacky Jackson', 'Steven Stevenson']
dataframe['Age'] = [38, 25]

dataframe['Driver'] = [True, False]

# create row

new_person = pd.Series(['Molly money', 40, True], index=["Name", 'Age', 'Driver'])

# append row

dataframe.append(new_person, ignore_index=True)