# VkDeviceDiagnosticsConfigCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceDiagnosticsConfigCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceDiagnosticsConfigCreateInfoNV - Specify diagnostics config for a Vulkan device

When using the Nsight™ Aftermath SDK, to configure how device crash
dumps are created, add a [VkDeviceDiagnosticsConfigCreateInfoNV](#)
structure to the `pNext` chain of the [VkDeviceCreateInfo](VkDeviceCreateInfo.html)
structure.

// Provided by VK_NV_device_diagnostics_config
typedef struct VkDeviceDiagnosticsConfigCreateInfoNV {
    VkStructureType                     sType;
    const void*                         pNext;
    VkDeviceDiagnosticsConfigFlagsNV    flags;
} VkDeviceDiagnosticsConfigCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDeviceDiagnosticsConfigFlagBitsNV](VkDeviceDiagnosticsConfigFlagBitsNV.html)
specifying additional parameters for configuring diagnostic tools.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceDiagnosticsConfigCreateInfoNV-sType-sType) VUID-VkDeviceDiagnosticsConfigCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_DIAGNOSTICS_CONFIG_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkDeviceDiagnosticsConfigCreateInfoNV-flags-parameter) VUID-VkDeviceDiagnosticsConfigCreateInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceDiagnosticsConfigFlagBitsNV](VkDeviceDiagnosticsConfigFlagBitsNV.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

[VK_NV_device_diagnostics_config](VK_NV_device_diagnostics_config.html), [VkDeviceDiagnosticsConfigFlagsNV](VkDeviceDiagnosticsConfigFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceDiagnosticsConfigCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
