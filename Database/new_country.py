import sys
import redshift_connector
from mysql.connector import Error
import pandas as pd

connection = redshift_connector.connect(
    host='redshift-cluster-1.cigoy313aggq.us-east-1.redshift.amazonaws.com',
    database='dev',
    port=5439,
    user='awsuser',
    password='Winter2023'
)

df_co2 = pd.read_csv("./CSV/newCountry/co2.csv")
df_pop = pd.read_csv('./CSV/newCountry/population-and-demography.csv')
df_gdp = pd.read_csv('./CSV/newCountry/gdp-per-capita.csv')
df_methane = pd.read_csv('./CSV/newCountry/methane-emissions.csv')
df_nitrous = pd.read_csv('./CSV/newCountry/nitrous-oxide-emissions.csv')
df_ghg = pd.read_csv('./CSV/newCountry/total-ghg-emissions.csv')


#pd.set_option('display.max_rows', None)
#pd.set_option('display.max_columns', None)


pd.reset_option('display.max_rows')
pd.reset_option('display.max_columns')

#countries_array =['Europe','Argentina', 'Australia', 'Brazil', 'United States', 'World', 'United Kingdom','Canada', 'China', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Mexico', 'Russia', 'Saudi Arabia', 'South Africa', 'South Korea','Turkey']

df_co2.rename(columns = {'Annual CO₂ emissions':'Annual CO2 emissions'}, inplace = True)

df_co2_noname = df_co2[['Entity','Year','Annual CO2 emissions']] 

df_co2_final = df_co2_noname

#df_methane = pd.read_csv(df_methane)

df_methane_noname = df_methane[['Entity','Year','Annual methane emissions']] 

df_methane_final = df_methane_noname

df_ghg_noname = df_ghg[['Entity','Year','Annual greenhouse gas emissions']] 

df_ghg_final = df_ghg_noname

#df_nitrous = pd.read_csv(nitrous_path)

df_nitrous_noname = df_nitrous[['Entity','Year','Annual nitrous oxide emissions']] 

df_nitrous_final = df_nitrous_noname

df_pop2 = df_pop[["Country name", "Year", "Population"]]
#print(df_pop2)

df_pop3 = pd.merge(

    left = df_co2,
    right = df_gdp,
    left_on = ["Entity","Year"],
    right_on = ["Entity","Year"]

)

df_pop3 = pd.merge(

    left = df_pop3,
    right = df_pop,
    left_on = ["Entity","Year"],
    right_on = ["Country name","Year"]

)

df_pop2 = pd.merge(

    left = df_co2,
    right = df_pop,
    left_on = ["Entity","Year"],
    right_on = ["Country name","Year"]

)




df_pop3["per_capita_CO2"] = df_pop3["Annual CO2 emissions"]/df_pop3["Population"]
df_pop3["per_gdp_CO2"] = df_pop3["Annual CO2 emissions"]*1000/(df_pop3["GDP per capita"]*df_pop3["Population"])

df_world = pd.read_sql("SELECT Year, annual_co2_emissions FROM finalproject2 WHERE Entity = 'World';", connection)
#print(df_world)
df_world = df_world.rename(columns={'year': 'Year'})
df_world = df_world.rename(columns={'annual_co2_emissions': 'Annual CO2 emissions'})

# Merge the filtered dataframe with the original dataframe on the 'Year' column
df_pop2 = pd.merge(df_pop2, df_world, on='Year', how='left', suffixes=('', '_world'))
#print(df_pop2)
# Calculate the percentage of global CO2 emissions for each country and year
df_pop2['CO2 emissions %'] = df_pop2['Annual CO2 emissions'] / df_pop2['Annual CO2 emissions_world'] * 100
#print(df_pop2)
# Drop the redundant 'Annual CO2 emissions_world' column
df_pop2 = df_pop2.drop('Annual CO2 emissions_world', axis=1)



df_pop2_final = df_pop2
#df_country_final = df_country[(df_country['Entity'].isin(countries_array))]
#df_pop2_final

df_pop3_final = df_pop3
#from google.colab import files
#df_pop3_final.to_csv('output.csv', encoding = 'utf-8-sig') 
#@#files.download('output.csv')
df_pop3_final = df_pop3_final.drop(columns = ['Code_x', 'Code_y', '417485-annotations', 'Country name', 'Population of children under the age of 1', 'Population aged 20 to 29 years'	,'Population aged 30 to 39 years'	,'Population aged 40 to 49 years',	'Population aged 50 to 59 years',	'Population aged 60 to 69 years',	'Population aged 70 to 79 years',	'Population aged 80 to 89 years',	'Population aged 90 to 99 years'	,'Population older than 100 years' ])
df_pop3_final = df_pop3_final.drop(columns=['Population of children under the age of 5','Population of children under the age of 15','Population under the age of 25','Population aged 15 to 64 years','Population older than 15 years','Population older than 18 years','Population at age 1','Population aged 1 to 4 years','Population aged 5 to 9 years','Population aged 10 to 14 years','Population aged 15 to 19 years'])
df_pop2_final = df_pop2_final.drop(columns = [ 'Country name', 'Population of children under the age of 1', 'Population aged 20 to 29 years'	,'Population aged 30 to 39 years'	,'Population aged 40 to 49 years',	'Population aged 50 to 59 years',	'Population aged 60 to 69 years',	'Population aged 70 to 79 years',	'Population aged 80 to 89 years',	'Population aged 90 to 99 years'	,'Population older than 100 years' ])
df_pop2_final = df_pop2_final.drop(columns=['Population of children under the age of 5','Population of children under the age of 15','Population under the age of 25','Population aged 15 to 64 years','Population older than 15 years','Population older than 18 years','Population at age 1','Population aged 1 to 4 years','Population aged 5 to 9 years','Population aged 10 to 14 years','Population aged 15 to 19 years'])
df_pop2_final = df_pop2_final.drop(columns=['Code','Annual CO2 emissions','Population'])

df_pop3_final = pd.merge(
    left = df_pop3_final,
    right = df_nitrous_final,
    left_on = ["Entity","Year"],
    right_on = ["Entity","Year"]
)

df_pop3_final = pd.merge(
    
 left = df_pop3_final,
    right = df_methane_final,
    left_on = ["Entity","Year"],
    right_on = ["Entity","Year"]

)


df_pop3_final = pd.merge(
    
 left = df_pop3_final,
    right = df_ghg_final,
    left_on = ["Entity","Year"],
    right_on = ["Entity","Year"]

)
df_pop3_final = pd.merge(
    
 left = df_pop3_final,
    right = df_pop2_final,
    left_on = ["Entity","Year"],
    right_on = ["Entity","Year"]

)

df_pop3_final['CO2 % from greenhouse emissions'] = df_pop3_final['Annual CO2 emissions'] / df_pop3_final['Annual greenhouse gas emissions'] * 100

val1 = df_pop3_final.values.tolist()



def execute_list_query(connection, sql, val):
    cursor = connection.cursor()
    try:
        cursor.executemany(sql, val)
        connection.commit()
        print("Query successful")
    except Error as err:
        print(f"Error: '{err}'")

query = '''
INSERT INTO finalProject2 (Entity, Year, Annual_CO2_emissions, GDP_per_capita, Population, 
    per_capita_CO2 , per_gdp_CO2, Annual_nitrous_oxide_emissions, Annual_methane_emissions, 
    Annual_greenhouse_gas_emissions, C02_emmissions_worldtotal, CO2_from_greenhouse_emissions)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
'''

execute_list_query(connection, query, val1)