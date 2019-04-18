" [onedark_hc.vim](https://github.com/phschaad/onedark_hc.vim/)

let s:overrides = get(g:, "onedark_color_overrides", {})

let s:colors = {
      \ "red": get(s:overrides, "red", { "gui": "#D70087", "cterm": "162", "cterm16": "1" }),
      \ "dark_red": get(s:overrides, "dark_red", { "gui": "#D70000", "cterm": "160", "cterm16": "9" }),
      \ "green": get(s:overrides, "green", { "gui": "#87D787", "cterm": "114", "cterm16": "2" }),
      \ "yellow": get(s:overrides, "yellow", { "gui": "#FFD700", "cterm": "220", "cterm16": "3" }),
      \ "dark_yellow": get(s:overrides, "dark_yellow", { "gui": "#FFAF00", "cterm": "214", "cterm16": "11" }),
      \ "blue": get(s:overrides, "blue", { "gui": "#00AFFF", "cterm": "39", "cterm16": "4" }),
      \ "purple": get(s:overrides, "purple", { "gui": "#AF87FF", "cterm": "141", "cterm16": "5" }),
      \ "cyan": get(s:overrides, "cyan", { "gui": "#00AFD7", "cterm": "38", "cterm16": "6" }),
      \ "white": get(s:overrides, "white", { "gui": "#EEEEEE", "cterm": "255", "cterm16": "7" }),
      \ "black": get(s:overrides, "black", { "gui": "#202020", "cterm": "0", "cterm16": "0" }),
      \ "visual_black": get(s:overrides, "visual_black", { "gui": "NONE", "cterm": "NONE", "cterm16": "0" }),
      \ "comment_grey": get(s:overrides, "comment_grey", { "gui": "#808080", "cterm": "244", "cterm16": "15" }),
      \ "gutter_fg_grey": get(s:overrides, "gutter_fg_grey", { "gui": "#444444", "cterm": "238", "cterm16": "15" }),
      \ "cursor_grey": get(s:overrides, "cursor_grey", { "gui": "#303030", "cterm": "236", "cterm16": "8" }),
      \ "visual_grey": get(s:overrides, "visual_grey", { "gui": "#3A3A3A", "cterm": "237", "cterm16": "15" }),
      \ "menu_grey": get(s:overrides, "menu_grey", { "gui": "#3A3A3A", "cterm": "237", "cterm16": "8" }),
      \ "special_grey": get(s:overrides, "special_grey", { "gui": "#444444", "cterm": "238", "cterm16": "15" }),
      \ "vertsplit": get(s:overrides, "vertsplit", { "gui": "#5F5F5F", "cterm": "59", "cterm16": "15" }),
      \}

function! onedark#GetColors()
  return s:colors
endfunction
