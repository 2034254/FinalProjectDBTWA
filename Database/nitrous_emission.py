import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

df_nitrous = pd.read_csv('./CSV/nitrous-oxide-emissions.csv')

df_nitrous_noname = df_nitrous[['Entity','Year','Annual nitrous oxide emissions']] 

countries_array = ['Russia', 'China', 'United States', 'Canada', 'World']

df_nitrous_final = df_nitrous_noname[(df_nitrous_noname['Entity'].isin(countries_array))]

# Creating Graph for comparing Canada All and Canada - Factory
# df_canada_vs_canada_no_factory
plt.style.use('default')

with plt.style.context('Solarize_Light2'):


  fig,axs = plt.subplots(figsize=(10,5))

  #plt.xticks(range(1750,2021), range(1750,2021))

  axs.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: f'{x / 10**9:.1f}'))

  ax_canada_vs_canada_no_factory = sns.lineplot(
      data=df_nitrous_final,
      x='Year',
      y='Annual nitrous oxide emissions',
      hue='Entity'
  )
  ax_canada_vs_canada_no_factory.set(
      xlabel='Date',
      ylabel='Billion Tonnes of Nitrous Oxide',
      ylim=(0,None),
      title='''Nitrous Oxide Emissions by Country per Year (1850 - 2021)'''
  )

  axs.set_xlim(df_nitrous_final['Year'].min(), df_nitrous_final['Year'].max())

  plt.xticks(range(1850, 2021, 25), range(1850, 2021, 25))

  plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0, title="")
  #plt.legend(title='')

  fig.savefig('./Pictures/nitous_emission.png', bbox_inches='tight')