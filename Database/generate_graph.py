import sys
import json
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from mysql.connector import Error

countries = sys.argv[1]
graphType = sys.argv[2]

countries = json.loads(countries)
size = len(countries)

import redshift_connector

connection = redshift_connector.connect(
     host='redshift-cluster-1.cigoy313aggq.us-east-1.redshift.amazonaws.com',
     database='dev',
     port=5439,
     user='awsuser',
     password='Winter2023'
)

def read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as err:
        print(f"Error: '{err}'")

countries_str = "', '".join(countries)

co2Query = f'''
    SELECT Entity,
    {graphType},
    Year
    FROM finalProject2
    WHERE Entity in ('{countries_str}')
'''


co2_data = read_query(connection, co2Query)

# Create a pandas DataFrame from the list
df_co2_final = pd.DataFrame(co2_data, columns=['Entity', 'Annual CO₂ emissions', 'Year'])

# Creating Graph for comparing Canada All and Canada - Factory
# df_canada_vs_canada_no_factory
plt.style.use('default')

with plt.style.context('Solarize_Light2'):


    fig,axs = plt.subplots(figsize=(10,5))

    #plt.xticks(range(1750,2021), range(1750,2021))

    axs.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: f'{x / 10**9:.0f}'))

    co2_country = sns.lineplot(
        data=df_co2_final,
        x='Year',
        y='Annual CO₂ emissions',
        hue='Entity'
    )

    co2_country.set(
        xlabel='Date',
        ylabel='Billion Tonnes of CO₂',
        ylim=(0,None),
        title='''CO₂ Emissions by Country per Year (1950 - 2018)'''
    )
    axs.set_xlim(df_co2_final['Year'].min(), df_co2_final['Year'].max())
    
    plt.xticks(range(1950, 2018, 5), range(1950, 2018, 5))

    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0, title="")
    #plt.legend(title='')
    
    fig.savefig('../Database/Pictures/co2_emission.png', bbox_inches='tight')