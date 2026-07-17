# Vulkan Specification

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/vulkan_spec.html

## Table of Contents

- [Vulkan Spec Variations](#_vulkan_spec_variations)
- [Vulkan_Spec_Variations](#_vulkan_spec_variations)
- [Vulkan Spec Version](#_vulkan_spec_version)
- [Vulkan_Spec_Version](#_vulkan_spec_version)
- [Vulkan Spec Format](#_vulkan_spec_format)
- [Vulkan_Spec_Format](#_vulkan_spec_format)
- [Antora](#_antora)
- [HTML](#_html)
- [PDF](#_pdf)
- [Man pages](#_man_pages)

## Content

The Vulkan Specification (usually referred to as the *Vulkan Spec*) is the official description of how the Vulkan API works and is ultimately used to decide what is and is not valid Vulkan usage. At first glance, the Vulkan Spec seems like an incredibly huge and dry chunk of text, but it is usually the most useful item to have open when developing.

|  | Reference the Vulkan Spec early and often. |
| --- | --- |

The Vulkan Spec can be built for any version and with any permutation of extensions. The Khronos Group hosts the [Vulkan Spec Registry](https://registry.khronos.org/vulkan/specs/) which contains a few publicly available variations that most developers will find sufficient. Anyone can build their own variation of the Vulkan Spec from [Vulkan-Docs](https://github.com/KhronosGroup/Vulkan-Docs/blob/main/BUILD.adoc).

When building the Vulkan Spec, you pass in what version of Vulkan to build for as well as what extensions to include. A Vulkan Spec without any extensions is also referred to as the [core version](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-coreversions) as it is the minimal amount of Vulkan an implementation needs to support in order to be [conformant](vulkan_cts.html#vulkan-cts).

Vulkan 1.0 to 1.3, there was a dedicated version of the spec. To reduce build permutation, starting with Vulkan 1.4 there is now a `latest` version that will always be updated to the latest version of Vulkan.

The [Vulkan SDK](https://vulkan.lunarg.com/doc/sdk/1.4.304.0/windows/1.4-extensions/vkspec.html) will always contain the version of the spec that it was created with.

The Vulkan Spec can be built into different formats.

To both combine various resources and improve navigation, there is now an [Antora built version of the spec](https://docs.vulkan.org/spec/latest/index.html) that is recommanded to use.

If you want to view the Vulkan Spec in its entirety as HTML, you just need to view the `html/vkspec.html` file.

[https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html](https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html)

The Vulkan SDK comes packaged with Vulkan Spec in its entirety as HTML for the version corresponding to the Vulkan SDK version. ([https://vulkan.lunarg.com/doc/sdk/1.4.304.0/windows/1.4-extensions/vkspec.html](https://vulkan.lunarg.com/doc/sdk/1.4.304.0/windows/1.4-extensions/vkspec.html))

To view the PDF format, visit the `pdf/vkspec.pdf` file.

[https://registry.khronos.org/vulkan/specs/latest/pdf/vkspec.pdf](https://registry.khronos.org/vulkan/specs/latest/pdf/vkspec.pdf)

The Vulkan SDK also comes with a PDF version ([https://vulkan.lunarg.com/doc/sdk/1.4.341.1/windows/1.4-extensions/vkspec.pdf](https://vulkan.lunarg.com/doc/sdk/1.4.341.1/windows/1.4-extensions/vkspec.pdf))

The Khronos Group currently only host the Vulkan Man Pages for the latest version of the spec, with all extensions, on the [online registry](https://registry.khronos.org/vulkan/specs/latest/man/html/).

The Vulkan Man Pages can also be found in the VulkanSDK for each SDK version. See the [Man Pages](https://vulkan.lunarg.com/doc/sdk/latest/windows/apispec.html) for the latest Vulkan SDK.
