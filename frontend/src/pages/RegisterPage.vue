<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <Dialog header="Вы успешно зарегистрировались!" v-model:visible="showMessage"
            :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            :style="{width: '30vw'}" :modal="true" position="top">
      <div class="flex align-items-center">
        Перед началом работы
        <router-link to="/login">
          <Button class="p-button-link">
            Войдите
          </Button>
        </router-link>
      </div>
    </Dialog>

    <div class="flex justify-content-center ">
      <div class="surface-card w-full">
        <div class="text-center mb-5">
          <img src="../assets/images/just-buy-logo-cut.png" alt="Image" height="50" class="mb-3">
          <div class="text-3xl mb-3">Регистрация</div>
        </div>
        <div class="p-fluid">


          <transition-group name="p-message" tag="div">
            <Message v-for="msg of messages" :severity="msg.severity" :key="msg.id">{{ msg.content }}</Message>
          </transition-group>


          <div class="field">
            <div class="p-float-label">
              <InputText id="name" v-model="v$.fio.$model" :class="{'p-invalid':v$.fio.$invalid && submitted}"/>
              <label for="name" :class="{'p-error':v$.fio.$invalid && submitted}">ФИО*</label>
            </div>
            <small v-if="(v$.fio.$invalid && submitted) || v$.fio.$pending.$response"
                   class="p-error mr-2">{{ v$.fio.required.$message.replace('Value', 'fio') }}</small>
          </div>

          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope"/>
              <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}"
                         aria-describedby="email-error"/>
              <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Почта*</label>
            </div>
            <span v-if="v$.email.$invalid && submitted">
              <span id="email-error" v-for="(error, index) of v$.email" :key="index">
                <small class="p-error mr-2" v-if="error.$message">{{ error.$message.replace('Value', 'email') }}</small>
              </span>
            </span>
          </div>

          <div class="field">
            <div class="p-float-label">
              <Password id="password" v-model="v$.password.$model"
                        :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                <template #header>
                  <h5>Надежность пароля</h5>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <Divider/>
                  <p class="mt-2">Требования</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>Минимальная длина - 6 символов</li>
                  </ul>
                </template>
              </Password>
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Пароль*</label>
            </div>

            <span v-if="v$.password.$invalid && submitted">
              <span id="password-error" v-for="(error, index) of v$.password" :key="index">
                <small class="p-error mr-2" v-if="error.$message">{{
                    error.$message.replace('Value', 'password')
                  }}</small>
              </span>
            </span>

          </div>

          <BlockUI :blocked='isSentData'>
            <Button class="mt-2 justify-content-center" @click="signup(!v$.$invalid)">Зарегистрироваться</Button>
          </BlockUI>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Auth} from "@/services/APIService";
import type {Ref} from 'vue';
import {reactive, ref} from 'vue';
import {email, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import type SignUpInterface from "@/assets/helpers/interfaces/SignUpInterface";

const state: SignUpInterface = reactive({fio: '', email: '', password: '',});
const rules = {fio: {required}, email: {required, email}, password: {required, minLength: minLength(6)},};

const submitted = ref(false);
const showMessage = ref(false);
const isSentData = ref(false);
const messages: Ref<{ severity: string, content: string }[]> = ref([]);

const v$ = useVuelidate(rules, state);
const resetForm = () => {
  state.fio = '';
  state.email = '';
  state.password = '';
  submitted.value = false;
}
const toggleDialog = () => {
  showMessage.value = !showMessage.value;

  if (!showMessage.value) {
    resetForm();
  }
}

const signup = async (isFormValid: boolean) => {
  submitted.value = true;
  if (!isFormValid) return;
  isSentData.value = true;
  let res = await Auth.signup(state);
  isSentData.value = false;
  if (res.status === 201) {
    toggleDialog()
  } else {
    messages.value.push({severity: 'error', content: res.errors.email[0],})
  }
}

</script>

<style lang="scss" scoped>
.dark {
  .surface-card {
    background: #1e1e1e !important;
    color: white;
  }
}
</style>