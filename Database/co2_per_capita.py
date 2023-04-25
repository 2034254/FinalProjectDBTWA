import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

df_co2 = pd.read_csv("../Database/CSV/annual-co2-emissions-per-country.csv")
df_pop = pd.read_csv('../Database/CSV/population-and-demography.csv')
df_gdp = pd.read_csv('../Database/CSV/gdp-per-capita.csv')

countries_array = ['Russia', 'China', 'United States', 'United Kingdom','Canada', 'World']

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

df_pop2["per_capita_CO2"] = df_pop2["Annual CO₂ emissions"]/df_pop2["Population"]
df_pop3["per_gdp_CO2"] = df_pop3["Annual CO₂ emissions"]*1000/(df_pop3["GDP per capita"]*df_pop3["Population"])

#print(df_pop2)
# Filter the df_pop2 dataframe to contain only the 'World' rows
df_world = df_pop2[df_pop2['Entity'] == 'World'][['Year', 'Annual CO₂ emissions']]
#print(df_world)
# Merge the filtered dataframe with the original dataframe on the 'Year' column
df_pop2 = pd.merge(df_pop2, df_world, on='Year', how='left', suffixes=('', '_world'))
#print(df_pop2)
# Calculate the percentage of global CO2 emissions for each country and year
df_pop2['CO₂ emissions %'] = df_pop2['Annual CO₂ emissions'] / df_pop2['Annual CO₂ emissions_world'] * 100
#print(df_pop2)
# Drop the redundant 'Annual CO₂ emissions_world' column
df_pop2 = df_pop2.drop('Annual CO₂ emissions_world', axis=1)



df_pop2_final = df_pop2[(df_pop2['Entity'].isin(countries_array))]
#df_country_final = df_country[(df_country['Entity'].isin(countries_array))]
#df_pop2_final

df_pop3_final = df_pop3[(df_pop3['Entity'].isin(countries_array))]

# Creating Graph for comparing Canada All and Canada - Factory
# df_canada_vs_canada_no_factory
plt.style.use('default')

with plt.style.context('Solarize_Light2'):


  fig,axs = plt.subplots(figsize=(10,5))

  #plt.xticks(range(1750,2021), range(1750,2021))

  co2_per_capita = sns.lineplot(
      data=df_pop2_final,
      x='Year',
      y='per_capita_CO2',
      hue='Entity'
  )
  co2_per_capita.set(
      xlabel='Date',
      ylabel='Tonnes of CO₂',
      ylim=(0,None),
      title='''CO₂ Emissions per Capita by Country per Year (1950 - 2021)'''
  )

  axs.set_xlim(df_pop2_final['Year'].min(), df_pop2_final['Year'].max())

  plt.xticks(range(1950, 2021, 10), range(1950, 2021, 10))

  plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0, title="")

  fig.savefig('./Pictures/co2_per_capita.png', bbox_inches='tight')