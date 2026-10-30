# vkGetShaderInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetShaderInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetShaderInfoAMD - Get information about a shader in a pipeline

Information about a particular shader that has been compiled as part of a
pipeline object can be extracted by calling:

// Provided by VK_AMD_shader_info
VkResult vkGetShaderInfoAMD(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    VkShaderStageFlagBits                       shaderStage,
    VkShaderInfoTypeAMD                         infoType,
    size_t*                                     pInfoSize,
    void*                                       pInfo);

* 
`device` is the device that created `pipeline`.

* 
`pipeline` is the target of the query.

* 
`shaderStage` is a [VkShaderStageFlagBits](VkShaderStageFlagBits.html) specifying the
particular shader within the pipeline about which information is being
queried.

* 
`infoType` describes what kind of information is being queried.

* 
`pInfoSize` is a pointer to a value related to the amount of data
the query returns, as described below.

* 
`pInfo` is either `NULL` or a pointer to a buffer.

If `pInfo` is `NULL`, then the maximum size of the information that **can**
be retrieved about the shader, in bytes, is returned in `pInfoSize`.
Otherwise, `pInfoSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pInfo`, and on
return the variable is overwritten with the amount of data actually written
to `pInfo`.
If `pInfoSize` is less than the maximum size that **can** be retrieved by
the pipeline cache, then at most `pInfoSize` bytes will be written to
`pInfo`, and [VK_INCOMPLETE](VkResult.html) will be returned, instead of
[VK_SUCCESS](VkResult.html), to indicate that not all required of the pipeline cache
was returned.

Not all information is available for every shader and implementations may
not support all kinds of information for any shader.
When a certain type of information is unavailable, the function returns
[VK_ERROR_FEATURE_NOT_PRESENT](VkResult.html).

If information is successfully and fully queried, the function will return
[VK_SUCCESS](VkResult.html).

For `infoType` [VK_SHADER_INFO_TYPE_STATISTICS_AMD](VkShaderInfoTypeAMD.html), a
`VkShaderStatisticsInfoAMD` structure will be written to the buffer
pointed to by `pInfo`.
This structure will be populated with statistics regarding the physical
device resources used by that shader along with other miscellaneous
information and is described in further detail below.

For `infoType` [VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD](VkShaderInfoTypeAMD.html), `pInfo` is
a pointer to a null-terminated UTF-8 string containing human-readable
disassembly.
The exact formatting and contents of the disassembly string are
vendor-specific.

The formatting and contents of all other types of information, including
`infoType` [VK_SHADER_INFO_TYPE_BINARY_AMD](VkShaderInfoTypeAMD.html), are left to the vendor
and are not further specified by this extension.

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](../../../../spec/latest/chapters/fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pInfoSize`,
the query returns up to the size of the passed buffer, and signals overflow
with a [VK_INCOMPLETE](VkResult.html) success status instead of returning a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html) error status. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderInfoAMD-device-parameter) VUID-vkGetShaderInfoAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetShaderInfoAMD-pipeline-parameter) VUID-vkGetShaderInfoAMD-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkGetShaderInfoAMD-shaderStage-parameter) VUID-vkGetShaderInfoAMD-shaderStage-parameter

 `shaderStage` **must** be a valid [VkShaderStageFlagBits](VkShaderStageFlagBits.html) value

* 
[](#VUID-vkGetShaderInfoAMD-infoType-parameter) VUID-vkGetShaderInfoAMD-infoType-parameter

 `infoType` **must** be a valid [VkShaderInfoTypeAMD](VkShaderInfoTypeAMD.html) value

* 
[](#VUID-vkGetShaderInfoAMD-pInfoSize-parameter) VUID-vkGetShaderInfoAMD-pInfoSize-parameter

 `pInfoSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetShaderInfoAMD-pInfo-parameter) VUID-vkGetShaderInfoAMD-pInfo-parameter

 If the value referenced by `pInfoSize` is not `0`, and `pInfo` is not `NULL`, `pInfo` **must** be a valid pointer to an array of `pInfoSize` bytes

* 
[](#VUID-vkGetShaderInfoAMD-pipeline-parent) VUID-vkGetShaderInfoAMD-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FEATURE_NOT_PRESENT](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_AMD_shader_info](VK_AMD_shader_info.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html), [VkShaderInfoTypeAMD](VkShaderInfoTypeAMD.html), [VkShaderStageFlagBits](VkShaderStageFlagBits.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetShaderInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
