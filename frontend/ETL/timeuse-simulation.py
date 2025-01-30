# -*- coding: utf-8 -*-
"""
Created on Sat May 18 19:03:10 2019

@author: erwin
"""

import json

path = r"C:\Users\ERWIN\OneDrive - Zuellig Pharma Holdings Pte Ltd\Zuellig\admin\Biofourmis\timeuse-simulation\data" #needs to change to your own path
file = r"\raw\activity.txt"
cleaned_file = r"\cleaned\activity_cleaned.json"

file_path = path + file
cleaned_file_path = path + cleaned_file

activities = []
with open(file_path) as fp:
    for cnt, line in enumerate(fp):
        content = line.split(",")
        activity = {}    
        person = content[0]
        activity[person] = "" 
        act_index = -1
        act_duration = 0
        for i in range(len(content)):
            if i > 0:
                act_list = []
                if content[i] == act_index:
                    act_duration = act_duration + 1
                else:
                    if act_index != -1: #not the first time
                        if len(activity[person]) > 0:
                            activity[person] = activity[person] + "," + str(act_index) + "," + str(act_duration)
                        else:
                            activity[person] =  str(act_index) + "," + str(act_duration)
                    act_index = content[i]
                    act_duration = 1
        activities.append(activity)

with open(cleaned_file_path,'w') as outfile:
    json.dump(activities,outfile, indent = 2)