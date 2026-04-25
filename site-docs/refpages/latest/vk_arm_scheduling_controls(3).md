# VK_ARM_scheduling_controls(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_scheduling_controls.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_scheduling_controls](#VK_ARM_scheduling_controls)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_scheduling_controls - device extension

**Name String**

`VK_ARM_scheduling_controls`

**Extension Type**

Device extension

**Registered Extension Number**

418

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_ARM_shader_core_builtins](VK_ARM_shader_core_builtins.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_scheduling_controls] @kpet%0A*Here describe the issue or question you have about the VK_ARM_scheduling_controls extension*)

**Last Modified Date**

2025-09-05

**Interactions and External Dependencies**

None

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Mikel Garai, Arm Ltd.

This extension exposes a collection of controls to modify the scheduling
behavior of Arm Mali devices.

* 
[vkCmdSetDispatchParametersARM](vkCmdSetDispatchParametersARM.html)

* 
[VkDispatchParametersARM](VkDispatchParametersARM.html)

* 
Extending [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceSchedulingControlsFeaturesARM](VkPhysicalDeviceSchedulingControlsFeaturesARM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM](VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM.html)

* 
[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)

* 
[VkPhysicalDeviceSchedulingControlsFlagBitsARM](VkPhysicalDeviceSchedulingControlsFlagBitsARM.html)

* 
[VkPhysicalDeviceSchedulingControlsFlagsARM](VkPhysicalDeviceSchedulingControlsFlagsARM.html)

* 
`VK_ARM_SCHEDULING_CONTROLS_EXTENSION_NAME`

* 
`VK_ARM_SCHEDULING_CONTROLS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_QUEUE_SHADER_CORE_CONTROL_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPATCH_PARAMETERS_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_PROPERTIES_ARM](VkStructureType.html)

None.

None.

* 
Revision 2, 2025-09-05 (Kévin Petit)

Add dispatch parameters controls

[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_DISPATCH_PARAMETERS_ARM](VkPhysicalDeviceSchedulingControlsFlagBitsARM.html)

* 
[vkCmdSetDispatchParametersARM](vkCmdSetDispatchParametersARM.html)

* 
[VkDispatchParametersARM](VkDispatchParametersARM.html)

* 
[VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM](VkPhysicalDeviceSchedulingControlsDispatchParametersPropertiesARM.html)

Revision 1, 2023-08-23 (Kévin Petit)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_scheduling_controls).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
