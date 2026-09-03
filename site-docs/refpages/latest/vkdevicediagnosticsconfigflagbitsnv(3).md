# VkDeviceDiagnosticsConfigFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceDiagnosticsConfigFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceDiagnosticsConfigFlagBitsNV - Bitmask specifying diagnostics flags

Bits which **can** be set in
[VkDeviceDiagnosticsConfigCreateInfoNV](VkDeviceDiagnosticsConfigCreateInfoNV.html)::`flags` include:

// Provided by VK_NV_device_diagnostics_config
typedef enum VkDeviceDiagnosticsConfigFlagBitsNV {
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_DEBUG_INFO_BIT_NV = 0x00000001,
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_RESOURCE_TRACKING_BIT_NV = 0x00000002,
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_AUTOMATIC_CHECKPOINTS_BIT_NV = 0x00000004,
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_ERROR_REPORTING_BIT_NV = 0x00000008,
} VkDeviceDiagnosticsConfigFlagBitsNV;

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_DEBUG_INFO_BIT_NV](#)
enables the generation of debug information for shaders.

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_RESOURCE_TRACKING_BIT_NV](#)
enables driver side tracking of resources (images, buffers, etc.) used
to augment the device fault information.

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_AUTOMATIC_CHECKPOINTS_BIT_NV](#)
enables automatic insertion of [    diagnostic checkpoints](../../../../spec/latest/chapters/debugging.html#device-diagnostic-checkpoints) for draw calls, dispatches,
trace rays,
and copies.
The CPU call stack at the time of the command will be associated as the
marker data for the automatically inserted checkpoints.

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_ERROR_REPORTING_BIT_NV](#)
enables shader error reporting.

[VK_NV_device_diagnostics_config](VK_NV_device_diagnostics_config.html), [VkDeviceDiagnosticsConfigFlagsNV](VkDeviceDiagnosticsConfigFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceDiagnosticsConfigFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
