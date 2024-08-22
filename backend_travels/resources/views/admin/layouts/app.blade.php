<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin Dashboard')</title>
    <link rel="stylesheet" href="{{ asset('vendor/adminlte/dist/css/adminlte.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/adminlte/plugins/fontawesome-free/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet" />

    @stack('css')
</head>

<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        @include('admin.layouts.partials.navbar')
        @include('admin.layouts.partials.sidebar')
        <div class="content-wrapper">
            @yield('content')
        </div>
        @include('admin.layouts.partials.footer')
    </div>
    <script src="{{ asset('vendor/adminlte/plugins/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('vendor/adminlte/dist/js/adminlte.min.js') }}"></script>
    @stack('js')
</body>
{{-- <script>
    document.addEventListener('DOMContentLoaded', () => {
        const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
        const body = document.body;

        // Check for saved mode preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }

        toggleDarkModeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Save the user preference in localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });
</script> --}}

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
        const body = document.body;

        // Check for saved mode preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }

        toggleDarkModeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Save the user preference in localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });
</script>


</html>
