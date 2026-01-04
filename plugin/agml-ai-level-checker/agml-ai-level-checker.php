<?php
/*
Plugin Name: AGML AI Level Checker
Description: AI使用率 (Lv1-Lv5) を質問に答えて自動判定するツール
Version: 1.2
Author: AI-Generated Music Label
Text Domain: agml-ai-level-checker
Domain Path: /languages
*/

if (!defined('ABSPATH')) {
    exit;
}

define('AGML_AI_LEVEL_CHECKER_VERSION', '1.3.0');
define('AGML_AI_LEVEL_CHECKER_PATH', plugin_dir_path(__FILE__));
define('AGML_AI_LEVEL_CHECKER_URL', plugin_dir_url(__FILE__));

function agml_ai_level_checker_load_textdomain() {
    load_plugin_textdomain(
        'agml-ai-level-checker',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages'
    );
}
add_action('plugins_loaded', 'agml_ai_level_checker_load_textdomain');

function agml_ai_level_checker_asset_url($relative) {
    return AGML_AI_LEVEL_CHECKER_URL . ltrim($relative, '/');
}

function agml_ai_level_checker_asset_version($relative) {
    $file_path = AGML_AI_LEVEL_CHECKER_PATH . ltrim($relative, '/');
    return file_exists($file_path) ? filemtime($file_path) : AGML_AI_LEVEL_CHECKER_VERSION;
}

function agml_ai_level_checker_enqueue_assets() {
    wp_enqueue_style(
        'agml-css',
        agml_ai_level_checker_asset_url('assets/css/frontend.css'),
        array(),
        agml_ai_level_checker_asset_version('assets/css/frontend.css')
    );

    $scripts = array(
        'agml-js' => array('assets/js/frontend.js', array('jquery'), true),
        'agml-levels' => array('assets/js/frontend-levels.js', array('jquery', 'agml-js'), true),
    );

    foreach ($scripts as $handle => $script) {
        list($path, $deps, $in_footer) = $script;
        wp_enqueue_script(
            $handle,
            agml_ai_level_checker_asset_url($path),
            $deps,
            agml_ai_level_checker_asset_version($path),
            $in_footer
        );
    }

    wp_localize_script('agml-js', 'agml_strings', array(
        'plugin_url' => AGML_AI_LEVEL_CHECKER_URL,
        'alert'      => __('すべての質問に回答してください。', 'agml-ai-level-checker'),
        'def_lv1'    => __('AIが自動生成した作品です。AI主導で人の介入はほぼありません。', 'agml-ai-level-checker'),
        'def_lv2'    => __('AIが主体となり、一部の修正のみ人が加えています。', 'agml-ai-level-checker'),
        'def_lv3'    => __('AIが生成した素材を活かし、人が整えた作品です。', 'agml-ai-level-checker'),
        'def_lv4'    => __('人が構想を決め、AIを補助として活用しています。', 'agml-ai-level-checker'),
        'def_lv5'    => __('人が全体を設計し、AIを道具として使いこなした創作です。', 'agml-ai-level-checker'),
    ));
}
add_action('wp_enqueue_scripts', 'agml_ai_level_checker_enqueue_assets', 99);

function agml_ai_level_checker_render_shortcode() {
    ob_start();
    include AGML_AI_LEVEL_CHECKER_PATH . 'templates/form.php';
    return ob_get_clean();
}
add_shortcode('agml_ai_level_checker', 'agml_ai_level_checker_render_shortcode');

