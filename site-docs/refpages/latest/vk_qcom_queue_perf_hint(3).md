# VK_QCOM_queue_perf_hint(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_queue_perf_hint.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_queue_perf_hint](#VK_QCOM_queue_perf_hint)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_queue_perf_hint - device extension

**Name String**

`VK_QCOM_queue_perf_hint`

**Extension Type**

Device extension

**Registered Extension Number**

303

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_queue_perf_hint] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_queue_perf_hint extension*)

**Extension Proposal**

[VK_QCOM_queue_perf_hint](../../../../features/latest/features/proposals/VK_QCOM_queue_perf_hint.html)

**Last Modified Date**

2026-02-26

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_internally_synchronized_queues](VK_KHR_internally_synchronized_queues.html)`

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc

This extension exposes power constraints to the application, allowing it to
provide hints for influencing the device’s clock frequency.

These hints are `VkQueue` state and are persistent across the life of
the queue until the app updates or removes the constraint.
The kernel combines the constraints across the active queues from all
processes to determine the actual clock frequency levels.

* 
[vkQueueSetPerfHintQCOM](vkQueueSetPerfHintQCOM.html)

* 
[VkPerfHintInfoQCOM](VkPerfHintInfoQCOM.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceQueuePerfHintFeaturesQCOM](VkPhysicalDeviceQueuePerfHintFeaturesQCOM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceQueuePerfHintPropertiesQCOM](VkPhysicalDeviceQueuePerfHintPropertiesQCOM.html)

* 
[VkPerfHintTypeQCOM](VkPerfHintTypeQCOM.html)

* 
`VK_QCOM_QUEUE_PERF_HINT_EXTENSION_NAME`

* 
`VK_QCOM_QUEUE_PERF_HINT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PERF_HINT_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_PERF_HINT_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_PERF_HINT_PROPERTIES_QCOM](VkStructureType.html)

None.

* 
Revision 1, 2026-02-26 (Matthew Netsch)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_queue_perf_hint).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
