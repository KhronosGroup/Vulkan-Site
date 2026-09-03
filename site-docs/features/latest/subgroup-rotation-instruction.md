# Subgroup rotation instruction

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_subgroup_rotate.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Using existing broadcast instruction](#_using_existing_broadcast_instruction)
- [2.1._Using_existing_broadcast_instruction](#_using_existing_broadcast_instruction)
- [2.2. Using existing shuffle instruction](#_using_existing_shuffle_instruction)
- [2.2._Using_existing_shuffle_instruction](#_using_existing_shuffle_instruction)
- [2.3. Using existing relative shuffle instruction](#_using_existing_relative_shuffle_instruction)
- [2.3._Using_existing_relative_shuffle_instruction](#_using_existing_relative_shuffle_instruction)
- [2.4. New shuffle features](#_new_shuffle_features)
- [2.4._New_shuffle_features](#_new_shuffle_features)
- [2.5. New dedicated SPIR-V instruction](#_new_dedicated_spir_v_instruction)
- [2.5._New_dedicated_SPIR-V_instruction](#_new_dedicated_spir_v_instruction)
- [3. Proposal](#_proposal)
- [4. Examples](#_examples)
- [5. Further Functionality](#_further_functionality)
- [5._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Using existing broadcast instruction](#_using_existing_broadcast_instruction)
[2.2. Using existing shuffle instruction](#_using_existing_shuffle_instruction)
[2.3. Using existing relative shuffle instruction](#_using_existing_relative_shuffle_instruction)
[2.4. New shuffle features](#_new_shuffle_features)
[2.5. New dedicated SPIR-V instruction](#_new_dedicated_spir_v_instruction)

[3. Proposal](#_proposal)
[4. Examples](#_examples)
[5. Further Functionality](#_further_functionality)

Subgroup operations are useful in the implementation of many compute algorithms.
Rotating values across invocations within a subgroup in particular can be useful
in the implementation of the convolution routines used in neural network inference.

A rotation by N rotates values "down" N invocations within the subgroup.

A rotation by (SubgroupSize - N) rotates values "up" N invocations
within the subgroup.

Taking the example of a subgroup of size 16, a rotation by 2 would,
when executed by the invocation identified by id 0, return the value from the
invocation identified by id 2. The same rotation instruction, when executed
by the invocation identified by id 14, would return the value from the invocation
identified by id 0.

While this rotation operation can be built on top of existing subgroup instructions,
doing so results in far from optimal performance on some implementations.

It is possible to broadcast the value for each invocation to all other invocations
and for each invocation to calculate the id of the invocation whose value it needs
to retain. This is very inefficient and the cost of the rotation operation as a
whole grows linearly with the size of the subgroup. It is included here only for
the sake of completeness.

The rotation operation above can be built on top of the **OpGroupNonUniformShuffle**
instruction, here abbreviated as `Shuffle`, as follows:

ShuffleRotate(value, amount) = Shuffle(value, ((amount + LocalId) & (SubgroupSize - 1)))

**OpGroupNonUniformShuffle** does not require the source
invocation’s id to be dynamically uniform within the subgroup which results in
inefficient code for implementations that can optimize the case where the source
ID is dynamically uniform. Admittedly, it is possible for applications to decorate
the calculated source id with `Uniform` and implementations to detect that pattern
and emit optimized code but this approach can be complex and costly to implement as
well as brittle, especially without introducing a new high-level language construct.

It is similarly possible to implement the rotation operation using the
**OpGroupNonUniformShuffleUp** or **OpGroupNonUniformShuffleDown** relative shuffle
instruction that are more efficient on some implementations. However, these
instructions also do not require the source invocation id to be dynamically
uniform and their relative nature makes calculating the source invocation ID
required for a rotation operation more complex than with a general shuffle.

Another solution that was considered is the addition of new subgroup features
that only enable shuffle instructions for cases where the source invocation ID
is dynamically uniform. While this would be a significant step toward enabling a
more efficient implementation of the rotation operation described here on
implementations that can optimize this case, it would not solve the implementation
complexity issues mentioned above.

This functionality would however be otherwise useful and could be added to the
current proposal or be the object of a separate proposal.

Introduce a new dedicated SPIR-V instruction that performs subgroup rotation
operations and requires the rotation distance to be dynamically uniform.

Expose a new dedicated SPIR-V instruction, as defined by
[SPV_KHR_subgroup_rotate](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_subgroup_rotate.html)
to express rotating values across the invocations of a subgroup that requires
the rotation amount to be dynamically uniform within the subgroup.

Specify new built-in functions to expose the SPIR-V instruction in GLSL:

genType  subgroupRotate(genType value,  uint delta);
genIType subgroupRotate(genIType value, uint delta);
genUType subgroupRotate(genUType value, uint delta);
genBType subgroupRotate(genBType value, uint delta);
genDType subgroupRotate(genDType value, uint delta);

genType  subgroupClusteredRotate(genType value,  uint delta, uint clusterSize);
genIType subgroupClusteredRotate(genIType value, uint delta, uint clusterSize);
genUType subgroupClusteredRotate(genUType value, uint delta, uint clusterSize);
genBType subgroupClusteredRotate(genBType value, uint delta, uint clusterSize);
genDType subgroupClusteredRotate(genDType value, uint delta, uint clusterSize);

If GL_EXT_shader_subgroup_extended_types_int8 is enabled:

genI8Type subgroupRotate(genI8Type value, uint delta);
genU8Type subgroupRotate(genU8Type value, uint delta);

genI8Type subgroupClusteredRotate(genI8Type value, uint delta, uint clusterSize);
genU8Type subgroupClusteredRotate(genU8Type value, uint delta, uint clusterSize);

If GL_EXT_shader_subgroup_extended_types_int16 is enabled:

genI16Type subgroupRotate(genI16Type value, uint delta);
genU16Type subgroupRotate(genU16Type value, uint delta);

genI16Type subgroupClusteredRotate(genI16Type value, uint delta, uint clusterSize);
genU16Type subgroupClusteredRotate(genU16Type value, uint delta, uint clusterSize);

If GL_EXT_shader_subgroup_extended_types_int64 is enabled:

genI64Type subgroupRotate(genI64Type value, uint delta);
genU64Type subgroupRotate(genU64Type value, uint delta);

genI64Type subgroupClusteredRotate(genI64Type value, uint delta, uint clusterSize);
genU64Type subgroupClusteredRotate(genU64Type value, uint delta, uint clusterSize);

If GL_EXT_shader_subgroup_extended_types_float16 is enabled:

genF16Type subgroupRotate(genF16Type value, uint delta);

genF16Type subgroupClusteredRotate(genF16Type value, uint delta, uint clusterSize);

Each of the rotate functions shuffles `value` to the invocation with a `gl_SubgroupInvocationID` equal to `(gl_SubgroupInvocationID + delta) % gl_SubgroupSize` for `subgroupRotate`, or to the invocation with a `gl_SubgroupInvocationID` equal to `(gl_SubgroupInvocationID - (gl_SubgroupInvocationID % clusterSize)) + ((gl_SubgroupInvocationID % clusterSize + delta) % clusterSize)` for `subgroupClusteredRotate` functions.

OpCapability GroupNonUniformShuffleRotateKHR
...
%result = OpGroupNonUniformShuffleRotateKHR %result_type Subgroup %value %amount

See the above description for new shuffle features that would require the
source invocation id to be dynamically uniform.
