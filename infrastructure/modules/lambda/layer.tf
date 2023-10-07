resource "aws_lambda_layer_version" "lambda_layer" {
  filename         = data.archive_file.deps_layer_code_zip.output_path
  source_code_hash = data.archive_file.deps_layer_code_zip.output_base64sha256
  layer_name       = var.lambda_function_layer_name

  compatible_runtimes = [var.lambda_function_runtime]
}

data "archive_file" "deps_layer_code_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../layers/deps-layer/"
  output_path = "${path.module}/../../layers/deps.zip"
}
