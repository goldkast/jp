<?php
/**
 * Plugin Name: AGML Label Download
 * Description: 「AI生成音楽認ラベル」ダウンロードページ専用プラグイン（ホーム構成と完全同期・2JS構成）
 * Version: 1.0.5
 * Author: AI-Generated Music Label
 */

if (!defined('ABSPATH')) {
  exit;
}

define('AGML_LABEL_DOWNLOAD_VERSION', '1.0.5');
define('AGML_LABEL_DOWNLOAD_PATH', plugin_dir_path(__FILE__));
define('AGML_LABEL_DOWNLOAD_URL', plugin_dir_url(__FILE__));
define('AGML_LABEL_DOWNLOAD_PAGE_ID', 3964);

function agml_label_download_asset_url($relative) {
  return AGML_LABEL_DOWNLOAD_URL . ltrim($relative, '/');
}

function agml_label_download_asset_version($relative) {
  $file_path = AGML_LABEL_DOWNLOAD_PATH . ltrim($relative, '/');
  return file_exists($file_path) ? filemtime($file_path) : AGML_LABEL_DOWNLOAD_VERSION;
}

function agml_label_download_enqueue_scripts() {
  if (!is_page(AGML_LABEL_DOWNLOAD_PAGE_ID)) {
    return;
  }

  wp_dequeue_script('agml-js');
  wp_deregister_script('agml-js');
  wp_dequeue_script('agml-levels');
  wp_deregister_script('agml-levels');

  wp_enqueue_style(
    'agml-download-css',
    agml_label_download_asset_url('assets/css/frontend-download.css'),
    array('agml-css'),
    agml_label_download_asset_version('assets/css/frontend-download.css')
  );

  $scripts = array(
    'agml-download-js' => array('assets/js/frontend-download.js', array('jquery')),
    'agml-download-levels' => array('assets/js/frontend-download-levels.js', array('jquery', 'agml-download-js')),
  );

  foreach ($scripts as $handle => $data) {
    list($path, $deps) = $data;
    wp_enqueue_script(
      $handle,
      agml_label_download_asset_url($path),
      $deps,
      agml_label_download_asset_version($path),
      true
    );
  }

  wp_localize_script('agml-download-js', 'agml_download_strings', array(
    'plugin_url' => AGML_LABEL_DOWNLOAD_URL,
  ));
}
add_action('wp_enqueue_scripts', 'agml_label_download_enqueue_scripts', 99);

/**
 * --------------------------------------------------------
 *  ダウンロードページショートコード
 * --------------------------------------------------------
 */
function agml_label_download_shortcode() {
  ob_start();
  include plugin_dir_path(__FILE__) . 'templates/download-page.php';
  return ob_get_clean();
}
add_shortcode('agml_label_download', 'agml_label_download_shortcode');

/**
 * --------------------------------------------------------
 *  管理者向け説明ページ（任意）
 * --------------------------------------------------------
 */
function agml_label_download_admin_menu() {
  add_menu_page(
    'AGML Label Download',
    'AGML Label Download',
    'manage_options',
    'agml-label-download',
    'agml_label_download_admin_page',
    'dashicons-download',
    30
  );
}

function agml_label_download_admin_page() {
  echo '<div class="wrap"><h1>AGML Label Download</h1>';
  echo '<p>このプラグインは「AI生成音楽認ラベル」ダウンロードページ専用構成を提供します。</p>';
  echo '<ul>';
  echo '<li>・専用CSS：<code>assets/css/frontend-download.css</code></li>';
  echo '<li>・専用JS①：<code>assets/js/frontend-download.js</code></li>';
  echo '<li>・専用JS②：<code>assets/js/frontend-download-levels.js</code></li>';
  echo '<li>・テンプレート：<code>templates/download-page.php</code></li>';
  echo '</ul>';
  echo '<p>固定ページでショートコード <code>[agml_label_download]</code> を使用してください。</p>';
  echo '</div>';
}
add_action('admin_menu', 'agml_label_download_admin_menu');
