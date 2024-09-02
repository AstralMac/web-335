"""
Author: Malcolm Abdullah
Date: August 31st, 2024
File Name: abdullah_lemonadeStand.py
Description:
"""

# External Parameters     
lemons_cost = 2.00 #cost of lemons
sugar_cost =  3.00 #cost of sugar
selling_price =  7.50 #selling price of one cup of lemonade.


#function to calculate cost of operations for lemonade stand
def calculate_cost(lemons_cost, sugar_cost):

#Parameters
    lemons_cost = 2.00 #cost of lemons
    sugar_cost= 3.00 #cost of sugar

#Return the total cost of lemons and sugar
    return lemons_cost + sugar_cost



#This is the a function to calculate profits.
def calculate_profit (lemons_cost, sugar_cost, selling_price) :
    #Parameters:
        lemons_cost= 2.00 #cost of lemons
        sugar_cost=3.00 #cost of sugar
        selling_price= 7.50 #selling price of one cup of lemonade.

    #Calculate and return the profits from lemonade stand
        total_cost = calculate_cost (lemons_cost, sugar_cost)
        return selling_price - total_cost

#Calculate the total cost
total_cost = calculate_cost(lemons_cost, sugar_cost)
cost_output = f"({lemons_cost})+({sugar_cost})={total_cost}"

#Calculate the Profit
profit = calculate_profit(lemons_cost, sugar_cost, selling_price)
profit_output = f"Selling Price: {selling_price} - Total Cost: {total_cost} = Profit {profit}"

print(cost_output)
print(profit_output)