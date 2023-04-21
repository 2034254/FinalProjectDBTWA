import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker


df_co2 = pd.read_csv("./CSV/annual-co2-emissions-per-country.csv")

countries_array = ['Russia', 'China', 'United States', 'Canada', 'World']


df_co2_noname = df_co2[['Entity','Year','Annual CO₂ emissions']] 


df_co2_final = df_co2_noname[(df_co2_noname['Entity'].isin(countries_array))]


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
        title='''CO₂ Emissions by country per year (1750 - 2021)'''
    )
    axs.set_xlim(df_co2_final['Year'].min(), df_co2_final['Year'].max())

    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left', borderaxespad=0, title="")
    #plt.legend(title='')
    
    fig.savefig('./Pictures/co2_emission.png', bbox_inches='tight')