# Changelog

## 2.0.x
Parameter order in `foldr` reducing function has flipped to list element followed by accumulator to match haskell

`foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b`

`foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b`
