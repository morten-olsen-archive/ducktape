const redirect = (manifest: any) => `
<html>
  <head><title>Register Github</title></head>
  <body>
    <form id="form" action="https://github.com/settings/apps/new" method="post">
    <input type="hidden" id="manifest" name="manifest" />
    Redirecting...
    <script>
      document.getElementById('manifest').value='${JSON.stringify(manifest)}';
      document.getElementById('form').submit();
    </script>
  </body>
</html>
`;

export default redirect;