# PFN_vkGetInstanceProcAddrLUNARG(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PFN_vkGetInstanceProcAddrLUNARG.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PFN_vkGetInstanceProcAddrLUNARG - Type definition for vkGetInstanceProcAddr

The type of [PFN_vkGetInstanceProcAddrLUNARG](#) is:

// Provided by VK_LUNARG_direct_driver_loading
typedef PFN_vkVoidFunction (*PFN_vkGetInstanceProcAddrLUNARG)(
    VkInstance                                  instance,
    const char*                                 pName);

* 
`instance` is a [VkInstance](VkInstance.html) handle.

* 
`pName` is the name of a Vulkan command.

This type is compatible with the type of a pointer to the
[vkGetInstanceProcAddr](vkGetInstanceProcAddr.html) command, but is used only to specify device
driver addresses in
[VkDirectDriverLoadingInfoLUNARG](VkDirectDriverLoadingInfoLUNARG.html)::`pfnGetInstanceProcAddr`.

|  | This type exists only because of limitations in the XML schema and
| --- | --- |
processing scripts, and its name may change in the future.
Ideally we would use the `PFN_vkGetInstanceProcAddr` type generated in
the `vulkan_core.h` header. |

[PFN_vkVoidFunction](PFN_vkVoidFunction.html), [VK_LUNARG_direct_driver_loading](VK_LUNARG_direct_driver_loading.html), [VkDirectDriverLoadingInfoLUNARG](VkDirectDriverLoadingInfoLUNARG.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#PFN_vkGetInstanceProcAddrLUNARG).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
