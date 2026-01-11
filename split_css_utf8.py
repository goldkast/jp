#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys

def split_css():
    with open('css/style.css', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # base.css: 最初の22行（リセット、html、body基本設定のみ）
    base_end = 22
    base_css = ''.join(lines[:base_end])
    
    # layout.css: 24行目から2102行目まで（構造・レイアウト専用）
    layout_start = 22  # 0-indexedなので24行目は23（22+1）
    layout_end = 2102
    layout_css = ''.join(lines[layout_start:layout_end])
    
    # theme-dark.css: 2103行目以降（見た目・上書き）
    theme_start = 2102  # 0-indexedなので2103行目は2102
    theme_css = ''.join(lines[theme_start:])
    
    # UTF-8 BOMなし、改行コードLFで保存
    with open('css/base.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(base_css)
    
    with open('css/layout.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(layout_css)
    
    with open('css/theme-dark.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(theme_css)
    
    print(f'CSS分割完了: base.css({len(base_css)}文字), layout.css({len(layout_css)}文字), theme-dark.css({len(theme_css)}文字)')

if __name__ == '__main__':
    split_css()
