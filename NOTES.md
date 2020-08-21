* Unify UI components (Row, Group, Item) between Toolbar and ControlPanel. Extract a pars.js file.
* [WIP] Add a clickable component tree
* Add name to component
* on site edition field : currently only simple raw text input field. Devise a more generic approchach
* Copy / Cut / Paste
* Undo / Redo
* add a Drop zone frame :
    * when dragging, insert a placeholder showing component actual layout properties to help visualize 
    * only when the component have been moved out of ifself (see behaviour of "dragging" flag in componentReducer.js)
* use createAction everywhere
    * refactor reducers accordingly
* one should be able to dock toolbar and property panel left / right, to avoid unreachable screen zones
* Facade gadget for propery editor : unit selector, number editor, color selector, layout (left, right, center, ), ...
* Load, save, save as buttons
  * should open a box to select a name, list files, etc
* Exporter API
* media query style properties

