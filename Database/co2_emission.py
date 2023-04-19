import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


df_co2 = pd.read_csv("./annual-co2-emissions-per-country.csv")

countries_array = ['Russia', 'China', 'United States', 'Canada', 'World']



df_co2_noname = df_co2[['Entity','Year','Annual CO₂ emissions']] 

df_co2_final = df_co2_noname[(df_co2_noname['Entity'].isin(countries_array))]


# Creating Graph for comparing Canada All and Canada - Factory
# df_canada_vs_canada_no_factory
plt.style.use('default')

with plt.style.context('Solarize_Light2'):


  fig,axs = plt.subplots(figsize=(10,5))

  #plt.xticks(range(1750,2021), range(1750,2021))

  co2_country = sns.lineplot(
      data=df_co2_final,
      x='Year',
      y='Annual CO₂ emissions',
      hue='Entity'
  )
  co2_country.set(
      xlabel='Date',
      ylabel='Kilotonnes of CO2',
      ylim=(0,None),
      title='''CO2 Emissions from 'countries_array' per year (1750 - 2021)'''
  )

  plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0, title="")
  #plt.legend(title='')
  
  fig.savefig('co2_emission.png')