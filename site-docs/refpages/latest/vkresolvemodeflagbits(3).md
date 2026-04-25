# VkResolveModeFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResolveModeFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResolveModeFlagBits - Bitmask indicating supported depth and stencil resolve modes

Multisample values in a multisample attachment are combined according to the
resolve mode used:

// Provided by VK_VERSION_1_2
typedef enum VkResolveModeFlagBits {
    VK_RESOLVE_MODE_NONE = 0,
    VK_RESOLVE_MODE_SAMPLE_ZERO_BIT = 0x00000001,
    VK_RESOLVE_MODE_AVERAGE_BIT = 0x00000002,
    VK_RESOLVE_MODE_MIN_BIT = 0x00000004,
    VK_RESOLVE_MODE_MAX_BIT = 0x00000008,
  // Provided by VK_ANDROID_external_format_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID = 0x00000010,
  // Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_RESOLVE_MODE_CUSTOM_BIT_EXT = 0x00000020,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_NONE_KHR = VK_RESOLVE_MODE_NONE,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_SAMPLE_ZERO_BIT_KHR = VK_RESOLVE_MODE_SAMPLE_ZERO_BIT,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_AVERAGE_BIT_KHR = VK_RESOLVE_MODE_AVERAGE_BIT,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_MIN_BIT_KHR = VK_RESOLVE_MODE_MIN_BIT,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_RESOLVE_MODE_MAX_BIT_KHR = VK_RESOLVE_MODE_MAX_BIT,
  // Provided by VK_ANDROID_external_format_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
  // VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_ANDROID is a legacy alias
    VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_ANDROID = VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID,
} VkResolveModeFlagBits;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkResolveModeFlagBits
typedef VkResolveModeFlagBits VkResolveModeFlagBitsKHR;

* 
[VK_RESOLVE_MODE_NONE](#) specifies that no resolve operation is done.

* 
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](#) specifies that result of the
resolve operation is equal to the value of sample 0.

* 
[VK_RESOLVE_MODE_AVERAGE_BIT](#) specifies that result of the resolve
operation is the average of the sample values.

* 
[VK_RESOLVE_MODE_MIN_BIT](#) specifies that result of the resolve
operation is the minimum of the sample values.

* 
[VK_RESOLVE_MODE_MAX_BIT](#) specifies that result of the resolve
operation is the maximum of the sample values.

* 
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#) specifies
that rather than a multisample resolve, a single sampled color
attachment will be downsampled into a Y′CBCR format image specified by
an external Android format.
Unlike other resolve modes, implementations can resolve multiple times
during rendering, or even bypass writing to the color attachment
altogether, as long as the final value is resolved to the resolve
attachment.
Values in the G, B, and R channels of the color
attachment will be written to the Y, CB, and CR
channels of the external format image, respectively.
Chroma values are calculated as if sampling with a linear filter from
the color attachment at full rate, at the location the chroma values sit
according to
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](VkPhysicalDeviceExternalFormatResolvePropertiesANDROID.html)::`externalFormatResolveChromaOffsetX`,
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](VkPhysicalDeviceExternalFormatResolvePropertiesANDROID.html)::`externalFormatResolveChromaOffsetY`,
and the chroma sample rate of the resolved image.

* 
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](#) specifies that the attachment will
be resolved by shaders in the render pass instead of fixed-function
operations.

If no resolve mode is otherwise specified, [VK_RESOLVE_MODE_AVERAGE_BIT](#)
is used.

If [VK_RESOLVE_MODE_AVERAGE_BIT](#) is used, and the source format is a
floating-point or normalized type, the sample values for each pixel are
resolved with implementation-defined numerical precision.

If the [numeric format](../../../../spec/latest/chapters/formats.html#formats-numericformat) of the resolve attachment
uses sRGB encoding, the implementation **should** convert samples from
nonlinear to linear before averaging samples as described in the “sRGB
EOTF” section of the [Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).
In this case, the implementation **must** convert the linear averaged value to
nonlinear before writing the resolved result to resolve attachment.
If the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is enabled,
whether a nonlinear to linear conversion happens for sRGB resolve is defined
by
[`resolveSrgbFormatAppliesTransferFunction`](../../../../spec/latest/chapters/limits.html#limits-resolveSrgbFormatAppliesTransferFunction).
This behavior **can** be overridden with appropriate
`VK_*`*RESOLVE*{SKIP,ENABLE}_TRANSFER_FUNCTION_BIT_KHR flag usage.

|  | No range compression or Y′CBCR model conversion is performed by
| --- | --- |
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](#); applications
have to do these conversions themselves.
Value outputs are expected to match those that would be read through a
[Y′CBCR sampler using ](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion-modelconversion)[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](VkSamplerYcbcrModelConversion.html).
The color space that the values should be in is defined by the platform and
is not exposed via Vulkan. |

[VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html), [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html), [VkResolveModeFlags](VkResolveModeFlags.html), [VkSubpassDescriptionDepthStencilResolve](VkSubpassDescriptionDepthStencilResolve.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkResolveModeFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
