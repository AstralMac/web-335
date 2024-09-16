"""
Author: Malcolm Abdullah
Date: September 15th, 2024
File Name: abdullah_lemonadeStand.py
Description: Conditional, Lists and loops exercises
"""

# List of tasks for lemonade stand
tasks = [
    "Pick location", 
    "Set-up stand", 
    "Purchase lemons and sugar", 
    "Make the lemonade", 
    "Sell the lemonade"
    ]

print("Lemonade Stand Tasks:")
# for loop to print tasks to the console window
for task in tasks:
    print(f"- {task}")

# days of the week
days_of_the_week = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
    ]

#Prints title of the schedule
print("\nLemonade Stand Schedule:")

# loop that iterates through days and tasks aggregating each day to a tasks with the exception of Saturday and sunday
for i, day in enumerate(days_of_the_week):
    if day == "Saturday" or day == "Sunday":
        print(f"{day}: It's a day off! Time to rest.")
    else: 
        print(f"{day}: {tasks[i % len(tasks)]}")

