import sys
import redshift_connector
from mysql.connector import Error
import pandas as pd

path = sys.argv[1]

df_new_data = pd.read_csv(path)

connection = redshift_connector.connect(
    host='redshift-cluster-1.cigoy313aggq.us-east-1.redshift.amazonaws.com',
    database='dev',
    port=5439,
    user='awsuser',
    password='Winter2023'
)

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

data = execute_list_query(connection, query)