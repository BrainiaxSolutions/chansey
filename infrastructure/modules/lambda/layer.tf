resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name = var.lambda_function_layer_name
  s3_bucket  = var.lambda_function_layer_s3_bucket
  s3_key     = var.lambda_function_layer_s3_key

  compatible_runtimes = [var.lambda_function_runtime]
}

data "archive_file" "deps_layer_code_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../node_modules/"
  output_path = "${path.module}/../../../node_modules/deps.zip"
}

data "aws_lambda_layer_version" "base_lambda_layer" {
  layer_name = var.lambda_function_base_layer_name
}

resource "aws_s3_object" "deps_layer_code_zip" {
  bucket = var.lambda_function_layer_s3_bucket
  key    = "chansey/chansey-layer.zip"
  source = data.archive_file.deps_layer_code_zip.output_path
}
