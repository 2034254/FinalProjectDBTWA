import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

df_methane = pd.read_csv('./methane-emissions.csv')

countries_array = ['Russia', 'China', 'United States', 'Canada', 'World']

df_methane_noname = df_methane[['Entity','Year','Annual methane emissions']] 

df_methane_final = df_methane_noname[(df_methane_noname['Entity'].isin(countries_array))]

# Creating Graph for comparing Canada All and Canada - Factory
# df_canada_vs_canada_no_factory
plt.style.use('default')

with plt.style.context('Solarize_Light2'):


  fig,axs = plt.subplots(figsize=(10,5))

  #plt.xticks(range(1750,2021), range(1750,2021))

  axs.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: f'{x / 10**9:.0f}'))

  ax_canada_vs_canada_no_factory = sns.lineplot(
      data=df_methane_final,
      x='Year',
      y='Annual methane emissions',
      hue='Entity'
  )
  ax_canada_vs_canada_no_factory.set(
      xlabel='Date',
      ylabel='Billion Tonnes of Methane',
      ylim=(0,None),
      title='''Methane Emissions by country per year (1850 - 2021)'''
  )

  axs.set_xlim(df_methane_final['Year'].min(), df_methane_final['Year'].max())

  plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0, title="")
  #plt.legend(title='')

  fig.savefig('methane_emission.png', bbox_inches='tight')