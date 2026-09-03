# Shaders

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/shaders/README.html

## Table of Contents

- [Shader languages](#_shader_languages)
- [Compiling shaders](#_compiling_shaders)
- [Selecting shading language](#_selecting_shading_language)
- [Selecting_shading_language](#_selecting_shading_language)
- [Further information](#_further_information)

## Content

This folder contains the textual shaders for the samples. All samples come with GLSL shaders and some optionally with Slang and HLSL shaders. For samples that support multiple shader languages, this is a good way to compare the syntax differences when targeting SPIR-V for Vulkan.

The samples load offline compiled SPIR-V variants of the GLSL/Slang/HLSL shaders. If you have the appropriate compiler installed, e.g. via the LunarG VUlkan SDK, shaders will be automatically compiled when building the samples project.

**Note for compiling Slang shaders**:  The minimum required version of the Slang compiler is `2025.16.1`. Older versions might have issues compiling shaders or may result in invalid SPIR-V. It’s advised to use the latest version from [here](https://github.com/shader-slang/slang/releases).

To select a shading language, use the `--shading-language` argument followed by the shading language `glsl`, `slang` or `hlsl`. Samples default to `glsl`.

The [Vulkan Guide](../../../guide/latest/index.html) contains further information on how to use HLSL with Vulkan and how it compares to GLSL:

* 
[HLSL in Vulkan](../../../guide/latest/hlsl.html)

* 
[High level shading language comparison](../../../guide/latest/high_level_shader_language_comparison.html)

* 
[Slang shading language documentation](https://shader-slang.org/docs/)
