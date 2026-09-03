# vkGetShaderBinaryDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetShaderBinaryDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetShaderBinaryDataEXT - Get the binary shader code from a shader object

Binary shader code **can** be retrieved from a shader object using the command:

// Provided by VK_EXT_shader_object
VkResult vkGetShaderBinaryDataEXT(
    VkDevice                                    device,
    VkShaderEXT                                 shader,
    size_t*                                     pDataSize,
    void*                                       pData);

* 
`device` is the logical device that shader object was created from.

* 
`shader` is the shader object to retrieve binary shader code from.

* 
`pDataSize` is a pointer to a `size_t` value related to the size
of the binary shader code, as described below.

* 
`pData` is either `NULL` or a pointer to a buffer.

If `pData` is `NULL`, then the size of the binary shader code of the
shader object, in bytes, is returned in `pDataSize`.
Otherwise, `pDataSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pData`, and on
return the variable is overwritten with the amount of data actually written
to `pData`.
If `pDataSize` is less than the size of the binary shader code, nothing
is written to `pData`, and [VK_INCOMPLETE](VkResult.html) will be returned instead
of [VK_SUCCESS](VkResult.html).

|  | The behavior of this command when `pDataSize` is too small differs from
| --- | --- |
how some other getter-type commands work in Vulkan.
Because shader binary data is only usable in its entirety, it would never be
useful for the implementation to return partial data.
Because of this, nothing is written to `pData` unless `pDataSize` is
large enough to fit the data in its entirety.

This behavior is not consistent with the behavior described in
[Opaque Binary Data Results](../../../../spec/latest/chapters/fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns a [VK_INCOMPLETE](VkResult.html) success status instead of a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html) error status. |

Binary shader code retrieved using `vkGetShaderBinaryDataEXT` **can** be
passed to a subsequent call to [vkCreateShadersEXT](vkCreateShadersEXT.html) on a compatible
physical device by specifying [VK_SHADER_CODE_TYPE_BINARY_EXT](VkShaderCodeTypeEXT.html) in the
`codeType` member of `VkShaderCreateInfoEXT`.

The shader code returned by repeated calls to this function with the same
`VkShaderEXT` is guaranteed to be invariant for the lifetime of the
`VkShaderEXT` object.

Valid Usage

* 
[](#VUID-vkGetShaderBinaryDataEXT-None-08461) VUID-vkGetShaderBinaryDataEXT-None-08461

The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkGetShaderBinaryDataEXT-None-08499) VUID-vkGetShaderBinaryDataEXT-None-08499

If `pData` is not `NULL`, it **must** be aligned to `16` bytes

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderBinaryDataEXT-device-parameter) VUID-vkGetShaderBinaryDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetShaderBinaryDataEXT-shader-parameter) VUID-vkGetShaderBinaryDataEXT-shader-parameter

 `shader` **must** be a valid [VkShaderEXT](VkShaderEXT.html) handle

* 
[](#VUID-vkGetShaderBinaryDataEXT-pDataSize-parameter) VUID-vkGetShaderBinaryDataEXT-pDataSize-parameter

 `pDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetShaderBinaryDataEXT-pData-parameter) VUID-vkGetShaderBinaryDataEXT-pData-parameter

 If the value referenced by `pDataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pDataSize` bytes

* 
[](#VUID-vkGetShaderBinaryDataEXT-shader-parent) VUID-vkGetShaderBinaryDataEXT-shader-parent

 `shader` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VkDevice](VkDevice.html), [VkShaderEXT](VkShaderEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetShaderBinaryDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
