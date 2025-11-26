<?php
require 'class/conf.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HR Management</title>

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Flowbite CSS -->
    <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet">
    <!-- Flowbite Datepicker CSS -->
    <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/datepicker.min.css" rel="stylesheet">
</head>

<style>
    * {
        font-family: Helvetica, Arial, sans-serif;
    }

    ::-webkit-scrollbar {
        width: 11px;
        height: 11px;
    }

    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #8b8b8b;
        border-radius: 10px;
        border: 2px solid #fff;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 11px;
        height: 11px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: #212934;
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #8b8b8b;
        border-radius: 10px;
        border: 2px solid #212934;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
    .bottom-border-input {
  border: none; /* Remove all borders */
  border-bottom: 1px solid #ccc; /* Add a light gray bottom border */
  padding: 0.25rem 0; /* Add some padding, top/bottom 0.25rem, left/right 0 */
  transition: border-color 0.3s ease-in-out; /* Smooth transition for focus effect */
  outline: none; /* Remove default focus outline */
}

.bottom-border-input:focus {
  border-bottom-color: #009333; /* Green bottom border on focus */
}
</style>


<body>
    <div class="flex h-screen overflow-hidden">

        <?php require 'module/sidebar.php'; ?>
        <!-- Header -->
        <div class="flex-1 flex flex-col h-screen overflow-hidden">
            <?php require 'module/header.php'; ?>
            <?php require 'module/inc.php'; ?>
        </div>
    </div>
    </div>

</body>
<!-- Flowbite JS -->
<script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/datepicker.min.js"></script>
<script src="/script/confirmationModel.js"></script>
<script src="/script/toaster.js"></script>
<script src="/main.js"></script>
</html>