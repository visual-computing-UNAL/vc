# Formulae

Took from [here](https://codedoc.cc/docs/markdown/formula).

The `Formula` component allows for using math formulas in your docs:

> :Tabs
> > :Tab title=How it looks
> > 
> > > :Formula align=center
> > > ```
> > > f_n = 
> > > \begin{cases}
> > > 1 & \text{if \(n \leq 2\)} \\
> > > f_{n - 1} + f_{n - 2} & \text{otherwise} \\
> > > \end{cases}
> > > ```
>
> > :Tab title=markdown
> >
> > ```md
> > > :Formula align=center
> > > ```
> > > f_n = 
> > > \begin{cases}
> > > 1 & \text{if \(n \leq 2\)} \\
> > > f_{n - 1} + f_{n - 2} & \text{otherwise} \\
> > > \end{cases}
> > > ```
> > ```

You can also use Formula inline component:

> :Tabs
> > :Tab title=How it looks
> > 
> > So lets talk about [\frak{L}_{SM}](:Formula), or lets just do it in 
> > the last example of the page.
>
> > :Tab title=markdown
> >
> > ```md
> > So lets talk about [\frak{L}_{SM}](:Formula), or lets just do it in 
> > the last example of the page.
> > ```

> :ToCPrevNext