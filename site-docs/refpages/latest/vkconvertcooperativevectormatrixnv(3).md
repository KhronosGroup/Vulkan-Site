# vkConvertCooperativeVectorMatrixNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkConvertCooperativeVectorMatrixNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkConvertCooperativeVectorMatrixNV - Convert a cooperative vector matrix from one layout and type to another

To query the size of a cooperative vector matrix, or to convert a matrix to
another layout and type, call:

// Provided by VK_NV_cooperative_vector
VkResult vkConvertCooperativeVectorMatrixNV(
    VkDevice                                    device,
    const VkConvertCooperativeVectorMatrixInfoNV* pInfo);

* 
`device` is the device.

* 
`pInfo` is a pointer to a
[VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html) structure containing
information about the layout conversion.

If `pInfo->dstData` is `NULL`, then the number of bytes required to
store the converted matrix is returned in `pDstSize`.
Otherwise, `pInfo->pDstSize` **must** point to a variable set by the user
to the number of bytes in `pInfo->dstData`, and on return the variable
is overwritten with the number of bytes actually written to
`pInfo->dstData`.
`pInfo->srcData` **can** be `NULL` when `pInfo->dstData` is `NULL`.
If `pInfo->pDstSize` is less than the number of bytes required to store
the converted matrix, no bytes will be written, and [VK_INCOMPLETE](VkResult.html) will
be returned instead of [VK_SUCCESS](VkResult.html), to indicate that not enough space
was provided.

Valid Usage

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10073) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10073

If `pInfo->srcData.hostAddress` is `NULL`, then
`pInfo->dstData.hostAddress` **must** be `NULL`

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10074) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10074

If `pInfo->srcData.hostAddress` is not `NULL`, then
`pInfo->srcSize` **must** be large enough to contain the source matrix,
based either on the standard matrix layout or based on the size filled
out by this command

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10075) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10075

If `pInfo->dstData.hostAddress` is not `NULL`, then the value
pointed to by `pInfo->pDstSize` **must** be large enough to contain the
destination matrix, based either on the standard matrix layout or based
on the size filled out by this command

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10076) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10076

If `pInfo->dstData.hostAddress` is not `NULL`, the source and
destination memory ranges **must** not overlap

Valid Usage (Implicit)

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-device-parameter) VUID-vkConvertCooperativeVectorMatrixNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-parameter) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), [VkConvertCooperativeVectorMatrixInfoNV](VkConvertCooperativeVectorMatrixInfoNV.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkConvertCooperativeVectorMatrixNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
